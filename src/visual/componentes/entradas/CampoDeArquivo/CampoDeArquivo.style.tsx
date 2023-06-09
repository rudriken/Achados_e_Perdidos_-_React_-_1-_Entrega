import { styled } from "@mui/material";

export const CampoDeArquivoConteiner = styled("div")`
    position: relative;
    .MuiTextField-root:last-of-type {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
    }
`;

export const IconeDeCarregamento = styled("i")`
    color: ${({ theme }) => theme.palette.text.secondary};
`;
