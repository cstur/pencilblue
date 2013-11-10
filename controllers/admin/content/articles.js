// Retrieve the header, body, and footer and return them to the router
this.init = function(request, output)
{
    var result = '';
    
    getSession(request, function(session)
    {
        if(!session['user'] || !session['user']['admin'])
        {
            output({redirect: SITE_ROOT});
            return;
        }
    
        initLocalization(request, session, function(data)
        {
            getHTMLTemplate('admin/head', 'Articles', null, function(data)
            {
                result = result.concat(data);
                result = getAdminNavigation(result, ['content', 'articles']);
                
                getHTMLTemplate('admin/content/articles', null, null, function(data)
                {
                    result = result.concat(data);
                    getHTMLTemplate('admin/footer', null, null, function(data)
                    {
                        result = result.concat(data);
                        if(session.section == 'articles')
                        {
                            result = result.concat(getJSTag('loadArticlesContent("' + SITE_ROOT + '", "' + session.subsection + '")'));
                        }
                        else
                        {
                            result = result.concat(getJSTag('loadArticlesContent("' + SITE_ROOT + '", "new_article")'));
                        }
                        
                        output({cookie: getSessionCookie(session), content: localize(['admin', 'articles'], result)});
                    });
                });
            });
        });
    });
}
