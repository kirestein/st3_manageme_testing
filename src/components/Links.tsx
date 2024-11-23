import { FormInput, Home, IdCard, UserCheck } from 'lucide-react'
import React from 'react'

const links = [
    {
        title: 'DASHBOARD',
        url: '/dashboard',
        icon: Home,
    },
    {
        title: 'FUNCIONÁRIOS',
        url: '/dashboard/employees',
        icon: UserCheck,
    },
    {
        title: 'CRACHÁS',
        url: '/dashboard/employees/[id]/tags',
        icon: IdCard,
    },
    {
        title: 'NOVO FUNCIONÁRIO',
        url: '/dashboard/employees/newEmployee',
        icon: FormInput,
    }
]

const LinksComponents = () => {
    return (
        <ul className="space-y-2">
            {links.map((link, index) => (
                <li key={index}>
                    <a
                        href={link.url}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        <link.icon size={20} />
                        <span>{link.title}</span>
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default LinksComponents