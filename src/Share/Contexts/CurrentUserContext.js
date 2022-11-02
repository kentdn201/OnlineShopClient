import { createContext } from "react";

const CurrentUserContext = createContext({
    id: null,
    role: null,
    email: null,
    firstName : null,
    lastName: null
})

export default CurrentUserContext;