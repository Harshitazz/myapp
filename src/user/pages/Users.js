import React from "react";
import UserList from "../components/UserList";

const Users=()=>{
    const USERS=[{
        id:'u1',
        name:'harshita',
        places:3,
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png'

    },{id:'u2',
    name:'harshita',
    places:3,
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png'
}
];
    return <UserList items={USERS}/>
}
export default Users;