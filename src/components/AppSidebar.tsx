import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import LinksComponents from './Links'

const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                <h1 className="text-2xl font-bold">Sidebar</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup title="Group 1">
                    <LinksComponents />
                </SidebarGroup>
                <SidebarGroup title="Group 2">
                    <ul>
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <p>Footer</p>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar