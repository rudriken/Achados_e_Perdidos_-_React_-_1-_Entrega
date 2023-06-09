import { useFormContext } from "react-hook-form";
import { FormularioCampos } from "../Formularios.style";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { LoginInterface } from "@/logica/interfaces/interfaces";

export function FormularioLogin() {
    const {
        register,
        formState: { errors },
    } = useFormContext<LoginInterface>();

    return (
        <FormularioCampos>
            <CampoDeTexto
                {...register("email")}
                label={"E-mail"}
                placeholder={"Digite o seu e-mail"}
                type={"email"}
                required
                error={errors?.email !== undefined}
                helperText={errors?.email?.message}
                style={{ marginBottom: 24 }}
            />
            <CampoDeTexto
                {...register("password")}
                label={"Senha"}
                placeholder={"Digite a sua senha"}
                type={"password"}
                required
                error={errors?.password !== undefined}
                helperText={errors?.password?.message}
            />
        </FormularioCampos>
    );
}
