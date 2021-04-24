export const verifyProtocol = (url: string) => {
    // Verify that the URL has some form of a protocol, preferrably HTTP/HTTPS
    if (url.search(^http[s]?:\/\/) == -1) {
        url = 'http://' + url
    }  
    return url;
}
