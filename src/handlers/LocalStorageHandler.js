export default class LocalStorageHandler 
{
    getValue = key => localStorage.getItem(key)
    
    clearValue = key => localStorage.removeItem(key)

    isAuthenticated = () => {
        if(this.getValue('jwt'))
        {
            return true
        }
        return false
    }

    unAuthenticate = () => {
        this.clearValue('jwt')
    }
}