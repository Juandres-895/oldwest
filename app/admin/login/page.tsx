'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import { loginSchema, type LoginInput } from '@/lib/validation/authSchema'
import { Field, inputClassName } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { BrandMark } from '@/components/menu/BrandMark'

export default function AdminLoginPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(values: LoginInput) {
    setServerError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword(values)

    if (error) {
      setServerError('Correo o contraseña incorrectos.')
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <main className="texture-wood flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-brass/20 bg-surface p-8">
        <BrandMark size="sm" />
        <h1 className="mt-4 text-center font-heading text-2xl text-bone">
          Panel de administración
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex flex-col gap-4"
        >
          <Field label="Correo" error={errors.email?.message}>
            <input
              type="email"
              autoComplete="email"
              className={inputClassName}
              {...register('email')}
            />
          </Field>

          <Field label="Contraseña" error={errors.password?.message}>
            <input
              type="password"
              autoComplete="current-password"
              className={inputClassName}
              {...register('password')}
            />
          </Field>

          {serverError && (
            <p className="font-ui text-xs text-oxblood-light">{serverError}</p>
          )}

          <Button type="submit" isLoading={isSubmitting} className="mt-2">
            {isSubmitting ? 'Ingresando…' : 'Ingresar'}
          </Button>
        </form>
      </div>
    </main>
  )
}
