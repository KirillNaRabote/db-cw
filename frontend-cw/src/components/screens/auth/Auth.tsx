import {FC, useState} from "react";
import Button from "@/ui/button/Button";
import Heading from "@/ui/Heading";
import {useAuth} from "@/hooks/useAuth";
import {useActions} from "@/hooks/useActions";
import {useForm, SubmitHandler} from 'react-hook-form'
import {IEmailPassword} from "@/store/user/user.interface";
import Field from "@/ui/input/Field";
import {validEmail} from "@/screens/auth/valid-email";
import Loader from "@/ui/Loader";
import cn from "clsx";
import {useAuthRedirect} from "@/screens/auth/useAuthredirect";

const Auth: FC = () => {
    useAuthRedirect()
    const {isLoading} = useAuth()

    const {login, register} = useActions()

    const [type, setType] = useState<'login' | 'register'>('login')

    const {
        register: formRegister,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<IEmailPassword>({
        mode: "onChange"
    })

    const onSubmit:SubmitHandler<IEmailPassword> = (data) => {
        if (type === 'login')
            login(data)
        else
            register(data)

        reset()
    }

    return (
        <section className='flex h-screen'>
            <form onSubmit={handleSubmit(onSubmit)}
                  className='rounded-lg bg-white shadow-2xl p-8 m-auto'>
                <Heading className='capitalize text-center mb-4'>{type}</Heading>

                {isLoading ? <Loader/> : <>

                    <Field
                        {...formRegister('email', {
                            required: 'Email is required',
                            pattern: {
                                value: validEmail,
                                message: 'Please enter valid email address'
                            }
                        })}
                        placeholder='Email'
                        error={errors.email?.message}
                    ></Field>
                    <Field
                        {...formRegister('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Min length should more 6 symbols',
                            }
                        })}
                        type='password'
                        placeholder='Password'
                        error={errors.password?.message}
                    ></Field>
                    <Button className={cn('')} type='submit' variant='orange'>Let's go!</Button>{' '}
                    <div>
                        <button
                            type='button'
                            className='inline-block opacity-50 mt-3'
                            onClick={() => {
                                setType(type === 'login' ? 'register' : 'login')
                            }}>
                            {type === 'login' ? 'Register' : 'Login'}
                        </button>
                    </div>
                </>}
            </form>
        </section>
    )
}

export default Auth