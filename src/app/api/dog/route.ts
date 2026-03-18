import { Dogs } from "@/models/dog";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest) => {

	const pageSize = request.nextUrl.searchParams.get('pageSize')
	const pageNumber = request.nextUrl.searchParams.get('pageNumber')

	const response = await Dogs.getInfoDogs(pageSize ?? undefined, pageNumber ?? undefined)

	return NextResponse.json(response)

}