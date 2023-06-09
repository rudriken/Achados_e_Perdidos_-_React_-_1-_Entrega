import { createContext, PropsWithChildren } from "react";
import {
    RedutorDoLocalUsuarioInterface,
    estadoInicial,
    useRedutorDoLocalUsuario,
} from "../redutores/RedutorDoLocalUsuario";

const valorInicial: RedutorDoLocalUsuarioInterface = {
    estadoDoLocalUsuario: estadoInicial,
    despachoDoLocalUsuario: () => {},
};

export const ContextoDoLocalUsuario = createContext(valorInicial);

export function ProvedorDoLocalUsuario({ children }: PropsWithChildren) {
    const redutor = useRedutorDoLocalUsuario();
    return (
        <ContextoDoLocalUsuario.Provider value={redutor}>
            {children}
        </ContextoDoLocalUsuario.Provider>
    );
}
