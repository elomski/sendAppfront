
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Inscription.css"

import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Buttton/Button";
import { useState } from "react";

export default function Registration() {
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);

        if (email.trim().length < 6 || email.trim().length > 32) {
        setError(true);
        const errorMessage = "L'email doit être compris entre 6 et 32 caractères";
        toast.error(errorMessage);
        return;
        }

        if (password.trim().length < 6 || password.trim().length > 32) {
        setError(true);
        const errorMessage = "L'email doit être compris entre 6 et 32 caractères";
        toast.error(errorMessage);
        return;
        }

        if (passwordConfirm.trim() != password.trim()) {
        setError(true);
        const errorMessage = "Les deux mot de passe sont différents";
        toast.error(errorMessage);
        return;
        }

        localStorage.setItem("email", email);

        setIsLoading(true);
        const formData = new FormData();

        formData.set("name", name);
        formData.set("firstname", firstname);
        formData.set("phone_number", phone_number);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("password_confirm", passwordConfirm);

        const response = await axios.post(
        "http://127.0.0.1:8000/api/FATE.v1.0.0/register",
        
        formData
        );

        if (response.data.success) {
        toast.success(response.data.message);
        setIsLoading(false);
        setTimeout(function () {
            navigate("/otp-code/" + email);
        }, 3000);
        } else {
        console.log(response.data);

        if (response.data.data.name !== undefined) {
            toast.error(response.data.data.name[0]);
        } else if (response.data.data.email !== undefined) {
            toast.error(response.data.data.email[0]);
        } else if (response.data.data.password !== undefined) {
            toast.error(response.data.data.password[0]);
        } else if (response.data.data.passwordConfirm !== undefined) {
            toast.error(response.data.data.passwordConfirm[0]);
        } else if (response.data.data.firstname !== undefined) {
            toast.error(response.data.data.firstname[0]);
        } else if (response.data.data.phone_number !== undefined) {
            toast.error(response.data.data.phone_number*$[0]);
        }

        setIsLoading(false);
        }
    };
    return (
        <section className="Inscription">
                <ToastContainer stacked />
        <div id="" className="form_conataint">
            <div className="submit">
            <h1>Inscription</h1><br />
            <p>Renseignez vos information Inscription pour vous inscrire</p>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div className="les_inputs">
                <div className="first_input">
                    <Input
                    label={"Nom"}
                    reference={"name"}
                    type={"text"}
                    value={name}
                    placeHolder={"Saisir votre nom ici"}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    />

                    <Input
                    label={"email"}
                    reference={"email"}
                    type={"email"}
                    value={email}
                    placeHolder={"Saisir l'adresse e-mail ici"}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    />

                    <Input
                    label={"Mot de passe"}
                    reference={"password"}
                    type={"password"}
                    value={password}
                    placeHolder={"Saisir le mot de passe ici"}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    />

                </div>

                <div className="seconde_input">
                <Input
                label={"Prénom"}
                reference={"firstname"}
                type={"text"}
                value={firstname}
                placeHolder={"Saisir votre prénom ici"}
                onChange={(e) => {
                    setFirstname(e.target.value);
                }}
                />
               
                <Input
                label={"Numero de Télephone"}
                reference={"phone_number"}
                type={"text"}
                value={phone_number}
                placeHolder={"Saisir votre numero de téléphone ici"}
                onChange={(e) => {
                    setPhone_number(e.target.value);
                }}
                />

                

                {/* Afficher les données saisient dans le champ en bat de l'input
                <div>{password}</div> */}

                <Input
                label={"Confirmation"}
                reference={"passwordConfirm"}
                type={"password"}
                value={passwordConfirm}
                placeHolder={"Confirmer votre  mot de passe ici"}
                onChange={(e) => {
                setPasswordConfirm(e.target.value);
                }}
                />
                </div>
                </div>
                
                <div className="submit">
                    <Button
                        disabled={isLoading}
                        type={"submit"}
                        text={isLoading ? "Chargement ..." : "Soumettre"}
                    />
                    <br />
                    <div>
                        vous avez déja un compte cliquer {"     "} 
                        <Link to={"/"}>ici</Link>
                    </div>
                    
                </div>
                {/* <Button type={"reset"} text={"Anuler"} /> */}
            </form>
            </div>
                
        </section>
        
    );
}
