(function () {
    $(function () {
        console.log('***1here is my custom content!');
        var basicAuthUI =
            '<div class="input"><input placeholder="username" id="input_username" name="username" type="text" size="10"/></div>' +
            '<div class="input"><input placeholder="password" id="input_password" name="password" type="password" size="10"/></div>' +
            '<label>Language:</label><select id="RLang"><option value="en">English</option><option value="ar">Arabic</option></select>';
        $(basicAuthUI).insertBefore('#api_selector div.input:last-child');
        $("#input_apiKey").hide();
        $('#input_baseUrl').hide();

        $('#input_username').change(addAuthorization);
        $('#input_password').change(addAuthorization);
        $('#RLang').on('change', function () {
            console.log(this.value);
            var key = this.value;
            if (key && key.trim() !== '') {
                swaggerUi.api.clientAuthorizations.add("key", new SwaggerClient.ApiKeyAuthorization("Accept-Language", key, "header"));
            }
        });
        
    });
   
    function addAuthorization() {
        var username = $('#input_username').val();
        var password = $('#input_password').val();
        if (username && username.trim() != "" && password && password.trim() != "") {
            var basicAuth = new SwaggerClient.PasswordAuthorization('basic', username, password);
            window.swaggerUi.api.clientAuthorizations.add("basicAuth", basicAuth);
            console.log("authorization added: username = " + username + ", password = " + password);
        }
    }
})();