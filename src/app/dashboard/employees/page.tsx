import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getAge } from '@/app/api'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'


const EmployeesPage = async () => {
    const allEmployees = await prisma.employee.findMany()
    return (
        <Table>
            <TableCaption>Um lista com todos os funcionários</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Idade</TableHead>
                    <TableHead>Telefones</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {allEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{getAge(employee.birthDate)}</TableCell>
                        <TableCell>{employee.phoneNumber} | {employee.mobile}</TableCell>
                        <TableCell className="text-right space-x-2">
                            <Button className='w-6 h-8'><Edit size={10} /></Button>
                            <Button className='w-6 h-8'><Trash2 size={10} /></Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    )
}

export default EmployeesPage