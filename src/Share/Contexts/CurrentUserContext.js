import { createContext } from "react";

const CurrentUserContext = createContext({
    id: null,
    roles: null,
    email: null,
    firstName : null,
    lastName: null
})

export default CurrentUserContext;