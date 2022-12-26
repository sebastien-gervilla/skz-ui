const getPageSize = () => {
    const body = document.body;
    const html = document.documentElement;
    return Math.max( body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight );
}

export const getProgression = () => {
    const pageSize = getPageSize();
    const relativeHeight = pageSize - window.innerHeight;
    
    if (!relativeHeight) return '100%';

    const html = document.documentElement;
    if (!html.scrollTop) return '0%';

    let percentile = html.scrollTop * 100 / relativeHeight;
    if (percentile > 100) percentile = 100;
    if (percentile < 0) percentile = 0;
    return Math.ceil(percentile) + '%';
}