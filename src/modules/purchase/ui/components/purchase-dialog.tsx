"use client"

import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field"
import { ComboboxDemo } from "@/components/combobox"
import { Button } from "@/components/ui/button"
import type { RequestDefault } from "@/api/purchase/request/types"
import { useMemo, useEffect, useState } from "react"
import { getUsers } from "@/api/purchase/user/user.api"
import type { User } from "@/api/purchase/user/types"
import { getEstabel } from "@/api/purchase/estabel/estabel.api"
import type { Estabel } from "@/api/purchase/estabel/types"

export function FormPurchase({
  data,
  loading,
  onCancel, // nova prop
}: {
  data?: RequestDefault | null,
  loading?: boolean,
  onCancel?: () => void // nova prop
}) {
  const today = new Date().toISOString().slice(0, 10)
  const form = useForm({
    defaultValues: {
      requisicao: data?.["nr-requisicao"]?.toString() ?? "",
      localEntrega: data?.["loc-entrega"] ?? "",
      estabelecimento: data
        ? `${data["cod-estabel"]} - ${data["nome"]}`
        : "",
      requisitante: data
        ? `${data["nome-abrev"]} - ${data["nome-abrev-desc"]}`
        : "",
      dataRequisicao: data?.["dt-atend"]
        ? new Date(data["dt-atend"]).toISOString().slice(0, 10)
        : today,
      tipo: data?.["tp-requis"]
        ? data["tp-requis"] === 1
          ? "estoque"
          : data["tp-requis"] === 2
          ? "compras"
          : data["tp-requis"] === 3
          ? "cotacao"
          : ""
        : "",
      comentarios: data?.narrativa ?? "",
    },
  })

  // Monta opções para os comboboxes
  // Estado para estabelecimentos
  const [estabeis, setEstabeis] = useState<Estabel[]>([])
  const [estabeisLoading, setEstabeisLoading] = useState(false)

  useEffect(() => {
    async function fetchEstabeis() {
      setEstabeisLoading(true)
      try {
        // Usa usuário e senha "super"
        const resp = await getEstabel("super", "super")
        setEstabeis(resp.data)
      } catch {
        setEstabeis([])
      }
      setEstabeisLoading(false)
    }
    fetchEstabeis()
  }, [])

  const estabelecimentoOptions = useMemo(() => {
    if (!estabeis.length) return []
    return estabeis.map(e => ({
      value: `${e["cod-estabel"]} - ${e.nome}`,
      label: `${e["cod-estabel"]} - ${e.nome}`,
    }))
  }, [estabeis])

  const [usuarios, setUsuarios] = useState<User[]>([])
  const [usuariosLoading, setUsuariosLoading] = useState(false)

  useEffect(() => {
    async function fetchUsuarios() {
      setUsuariosLoading(true)
      try {
        // Usa usuário e senha "super"
        const resp = await getUsers("super", "super")
        setUsuarios(resp.data)
      } catch {
        setUsuarios([])
      }
      setUsuariosLoading(false)
    }
    fetchUsuarios()
  }, [])

  const requisitanteOptions = useMemo(() => {
    if (!usuarios.length) return []
    return usuarios.map(u => ({
      value: `${u["nome-abrev"]} - ${u.nome}`,
      label: `${u["nome-abrev"]} - ${u.nome}`,
    }))
  }, [usuarios])

  return (
    <form className="space-y-6">
      <div className="flex gap-4">
        <Field>
          <FieldLabel>Requisição</FieldLabel>
          <FieldContent>
            <Input {...form.register("requisicao")} readOnly />
          </FieldContent>
          <FieldError errors={form.formState.errors.requisicao && [form.formState.errors.requisicao]} />
        </Field>
        <Field>
          <FieldLabel>Local de Entrega</FieldLabel>
          <FieldContent>
            <Input {...form.register("localEntrega")} />
          </FieldContent>
          <FieldError errors={form.formState.errors.localEntrega && [form.formState.errors.localEntrega]} />
        </Field>
        <Field>
          <FieldLabel>Data Requisição</FieldLabel>
          <FieldContent>
            <Input
              type="date"
              {...form.register("dataRequisicao")}
              value={today}
              readOnly
            />
          </FieldContent>
          <FieldError errors={form.formState.errors.dataRequisicao && [form.formState.errors.dataRequisicao]} />
        </Field>
      </div>
      <div className="gap-4 flex flex-col">
        <Field>
          <FieldLabel>Estabelecimento</FieldLabel>
          <FieldContent>
            <ComboboxDemo
              options={estabelecimentoOptions}
              value={form.watch("estabelecimento")}
              onChange={val => form.setValue("estabelecimento", val)}
              placeholder={estabeisLoading ? "Carregando..." : "Selecione o estabelecimento"}
              disabled={estabeisLoading || estabelecimentoOptions.length === 0}
            />
          </FieldContent>
          <FieldError errors={form.formState.errors.estabelecimento && [form.formState.errors.estabelecimento]} />
        </Field>
        <Field>
          <FieldLabel>Requisitante</FieldLabel>
          <FieldContent>
            <ComboboxDemo
              options={requisitanteOptions}
              value={form.watch("requisitante")}
              onChange={val => form.setValue("requisitante", val)}
              placeholder={usuariosLoading ? "Carregando..." : "Selecione o requisitante"}
              disabled={usuariosLoading || requisitanteOptions.length === 0}
            />
          </FieldContent>
          <FieldError errors={form.formState.errors.requisitante && [form.formState.errors.requisitante]} />
        </Field>
      </div>
      <Field>
        <FieldLabel>Tipo</FieldLabel>
        <FieldContent>
          <RadioGroup
            onValueChange={form.setValue.bind(null, "tipo")}
            value={form.watch("tipo")}
            className="flex flex-row gap-6"
          >
            <div className="flex flex-col items-center gap-1">
              <RadioGroupItem value="estoque" />
              <span className="mb-0 text-xs text-center">Requisição de Estoque</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RadioGroupItem value="compras" />
              <span className="mb-0 text-xs text-center">Solicitação de Compras</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RadioGroupItem value="cotacao" />
              <span className="mb-0 text-xs text-center">Solicitação de Cotação</span>
            </div>
          </RadioGroup>
        </FieldContent>
        <FieldError errors={form.formState.errors.tipo && [form.formState.errors.tipo]} />
      </Field>
      <Field>
        <FieldLabel>Comentários</FieldLabel>
        <FieldContent>
          <Textarea {...form.register("comentarios")} />
        </FieldContent>
        <FieldError errors={form.formState.errors.comentarios && [form.formState.errors.comentarios]} />
      </Field>
      <div className="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button type="submit" form="form-purchase" disabled={loading}>
          Salvar
        </Button>
      </div>
    </form>
  )
}
