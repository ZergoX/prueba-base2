import { Dogs } from "@/models/dog"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) => {
  const { id } = await context.params

  if (id === 'no')
    return NextResponse.json({error: 'La consulta no se puede realizar'}, {status: 400})

  const { data, error } = await Dogs.getDogById(id)

  const response = error ? {error: error} : { data: data}

  return NextResponse.json(response, { status: error ? 404 : 200 } )
}