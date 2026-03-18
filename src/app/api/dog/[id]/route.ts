import { Dogs } from "@/models/dog"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
  request: NextRequest,
  { params }: WithParams<{id: string}>,
) => {

  const { id } = await params


  if (id === 'no')
    return NextResponse.json({error: 'La consulta no se puede realizar'}, {status: 400})

  const { data, error } = await Dogs.getDogById(id)

  console.log(data, error)

  const response = error ? {error: error} : { data: data}

  return NextResponse.json(response, { status: error ? 404 : 200 } )
}