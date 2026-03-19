import { Dogs } from "@/models/dog";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
	try {
		const pageSize = request.nextUrl.searchParams.get('pageSize')
		const pageNumber = request.nextUrl.searchParams.get('pageNumber')

		const response = await Dogs.getInfoDogs(pageSize ?? '10', pageNumber ?? '1')

		return NextResponse.json(response)
	
	} catch {
		return NextResponse.json({error: 'Server Error'}, {status: 500})
	}
}
