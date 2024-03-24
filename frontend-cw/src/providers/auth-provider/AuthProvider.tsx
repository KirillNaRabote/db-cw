import {FC, PropsWithChildren, useEffect} from "react";
import dynamic from "next/dynamic";
import {useAuth} from "@/hooks/useAuth";
import {useActions} from "@/hooks/useActions";
import {getAccessToken, getRefreshToken} from "@/services/auth/auth.helper";
import {usePathname, useRouter} from "next/navigation";
import {protectedRoutes} from "@/providers/auth-provider/protected-routes.data";
import {ADMIN_PANEL_URL} from "@/config/url.config";
import {ADMIN, ID_ADMIN} from "@/constants/seo.constants";
import NotFound from "@/app/not-found";

const AuthProvider:
    FC<PropsWithChildren<unknown>> = ({
        children
    }) => {
    const {user} = useAuth()
    const {checkAuth, logout} = useActions()

    const pathname = usePathname()

    useEffect(() => {
        const accessToken = getAccessToken()
        if (accessToken) checkAuth()
    }, [])

    useEffect(() => {
        const refreshToken = getRefreshToken()
        if (!refreshToken && user) logout()
    }, [pathname]);

    const router = useRouter()

    const isProtectedRoute = protectedRoutes.some(route => pathname?.startsWith(route))
    const isAdminRoute = pathname?.startsWith(ADMIN_PANEL_URL)

    console.log(user, isProtectedRoute, isAdminRoute)
    if (!isProtectedRoute && !isAdminRoute) return <>{children}</>

    if (user?.idRole === ID_ADMIN) return <>{children}</>
    if (user && isProtectedRoute) return <>{children}</>

    if (user && isAdminRoute) return <NotFound/>

    pathname !== '/auth' && router.replace('/auth')
    return null
}

export default AuthProvider