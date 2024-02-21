import React from 'react'

interface SidebarProps{
        params:{workspaceId:string}
    className?:string
}
const Sidebar:React.FC<SidebarProps> = ({ params,className}) => {
    // data of the user
    const user=''
    // subscription data
    const subscription=''
    // folers 
    const folder=''
    // workspaces
    const workspace=''
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar