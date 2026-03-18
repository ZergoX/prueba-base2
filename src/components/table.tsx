'use client'

import axios from 'axios'
import { useState } from 'react'
import useSWR from 'swr'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
	Button
} from "@heroui/react";
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { DogPagination } from '@/models/dog';


export const CustomizableTable = () => {
	const getUrl = '/api/dog'
	const [size, setSize] = useState(10)
	const [page, setPage]= useState(1)
	const { data: info, error, isLoading } = 
    useSWR<{data?: { pagination: DogPagination, dogs: Record<string, string>[]}, error?: string}>(
      `${getUrl}?pageSize=${size}&pageNumber=${page}`, 
      (url) => (axios.get(url).then((res)=> res.data)), {
		    revalidateOnFocus: false,
        keepPreviousData: true
	    }
    )

	

	if (!info?.data || !info?.data?.dogs || info.data.dogs.length === 0 ) return <p>No data available</p>

  return (
    <div className="flex flex-col gap-4">
    <Table className="table-fixed w-full"  aria-label="Tabla de Perros">
        <TableHeader>
          <TableColumn className="w-1/4">NOMBRE</TableColumn>
          <TableColumn className="w-2/4">DESCRIPTION</TableColumn>
          <TableColumn className="w-1/4">ACTIONS</TableColumn>
        </TableHeader>

        <TableBody>
          {info.data.dogs.map((dog) => (
            <TableRow key={dog.id}>
              <TableCell className="overflow-hidden text-ellipsis whitespace-nowrap">{dog.name}</TableCell>
              <TableCell className="overflow-hidden text-ellipsis whitespace-nowrap"> {dog.description.length > 50
                  ? dog.description.slice(0, 50) + "..."
                  : dog.description}
                </TableCell>
              <TableCell className='text-center'>
                <Link href={`/dog/${dog.id}`}>
                  <Button isIconOnly size="sm" variant="light">
                    <Eye size={18} />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 🔢 Paginación */}
      <div className="flex justify-center items-center gap-2">
        <Button
          size="sm"
          variant="flat"
          isDisabled={info.data.pagination.current === 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </Button>

        <span className="text-sm">
          Página {info.data.pagination.current} de {info.data.pagination.last ?? 0}
        </span>

        <Button
          size="sm"
          variant="flat"
          isDisabled={!info.data.pagination.last}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
    
  )


}

