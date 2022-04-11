export const bindParam =(url,params)=>{
    const {id}= params;
    const urlnew = url.replace(':id',id)
    return urlnew   
}

export const isLogin = () => {
    return !!localStorage.getItem("data_user") && !!localStorage.getItem("token_user")
}

export const isTicket = () => {
    return !!localStorage.getItem("@ticket")
}