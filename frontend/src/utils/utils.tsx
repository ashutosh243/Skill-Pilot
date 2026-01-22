

export function saveTosession<T>(key:string,data:T):void{

    try{
         sessionStorage.setItem(key,JSON.stringify(data));
    }
    catch(e)
    {
        console.log("Failed to save data in session",e);
    }
}
export function getFromSession<T>(key:string):T|null{

    try{
        const data=sessionStorage.getItem(key);
        return data?(JSON.parse(data) as T) : null;
    }
    catch(e)
    {
        console.log("Failed to read data from session",e);
        return null;
    }
}