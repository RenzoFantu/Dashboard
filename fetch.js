//exporto formula para llamar api y reutilizar

export const callApi = async(url)=>{
    try{
        const response = await fetch (url);
        const data = response.json();
        return data
        //console.log(data);
    }catch(error){

    }
}