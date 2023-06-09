export const parciais = {
    privadas: [
        "_listar_objetos",
        "_adicionar_objeto",
        "_exibir_objeto",
        "_editar_objeto",
        "_apagar_objeto",
        "_informar_dono",
        "_alterar_dados",
        "_sair",
        "_excluir_local",
    ],
    publicas: ["_listar_locais", "_listar_objetos", "_ver_contato"],
};

export const caminhoAbsolutoDaImagem = {
    local: process.env.NEXT_PUBLIC_API + "public/locais/",
    objeto: process.env.NEXT_PUBLIC_API + "public/objetos/",
};

interface ConjuntoDeCampoStyle {
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
    marginBottom: number;
    border: string;
    maxWidth: number;
    width: string | number;
}

export const conjuntoDeCampo = {
    color: "#abb6c3",
    style: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 56,
        paddingRight: 56,
        marginBottom: 32,
        border: "1px solid #abb6c3",
        maxWidth: 900,
        width: "80%",
    } as ConjuntoDeCampoStyle,
};
