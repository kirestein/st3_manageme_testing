'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';


interface Employee {
    name: string;
    email: string;
    tagName: string;
    tagLastName: string;
    birthDate: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Employee = () => {
    const params = useParams();
    const [employee, setEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        async function getEmployeeById() {
            const id = params.id;
            console.log('id: ', id); // Verifique se o ID está sendo capturado corretamente
            try {
                const response = await fetch(`/api/employees/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const employee = await response.json();
                setEmployee(employee);
                console.log('employee: ', employee);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        if (params.id) {
            getEmployeeById();
        }
    }, [params.id]);

    console.log('id: ', params.id);
    console.log('employee: ', employee);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Employee Details</CardTitle>
                <CardDescription>Employee details page</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    {employee ? (
                        <div>
                            <h1>{employee.name}</h1>
                            <p>Email: {employee.email}</p>
                            <p>Tag Name: {employee.tagName}</p>
                            <p>Tag Last Name: {employee.tagLastName}</p>
                            <p>Birth Date: {employee.birthDate}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}

                </div>
            </CardContent>
            <CardFooter>
                <Link href="/dashboard/employees">Back</Link>
            </CardFooter>
        </Card>
    );
};

export default Employee