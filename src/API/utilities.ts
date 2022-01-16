export function SetParams(url: string, params: any): string
{
    params = Object.entries(params);

    if(url[0] == '/')
    {
        url = url.slice(1);
    }

    let combined = "";

    for(const index in params)
    {
        combined += combined.length ? '&' : '?';

        combined += `${params[index][0]}=${params[index][1]}`; 
    }

    return url + combined;
}