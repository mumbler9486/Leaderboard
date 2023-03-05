import azure from 'svelte-adapter-azure-swa';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: azure({
			customStaticWebAppConfig: {
				auth: {
				rolesSource: "/ngs-api/LoginGetRolesPSO2",
				identityProviders: {
					customOpenIdConnectProviders: {
					aadb2c: {
						registration: {
						clientIdSettingName: "AADB2C_PROVIDER_CLIENT_ID",
						clientCredential: {
							clientSecretSettingName: "AADB2C_PROVIDER_CLIENT_SECRET"
						},
						openIdConnectConfiguration: {
							wellKnownOpenIdConfiguration: "https://pso2centralb2c.b2clogin.com/pso2centralb2c.onmicrosoft.com/B2C_1_SignUpSignInFlow/v2.0/.well-known/openid-configuration"
						}
						},
						login: {
						nameClaimType: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
						scopes: ["openid","profile","email"],
						loginParameterNames: []
						}
					}
					}
				}
				},
				trailingSlash: "never",
				routes: [
				{
					route: "/profile",
					allowedRoles: ["user"],
					rewrite: "/api/__render"
				},
				{
					route: "/admin*",
					allowedRoles: ["administrator"],
					rewrite: "/api/__render"
				},
				{
					route: "/moderator*",
					allowedRoles: ["administrator","moderator"],
					rewrite: "/api/__render"
				},
				{
					route: "/ngs-api/ApproveRun*",
					allowedRoles: ["administrator","moderator"],
					rewrite: "/api/__render"
				},
				{
					route: "/ngs-api/DenyRun*",
					allowedRoles: ["administrator","moderator"],
					rewrite: "/api/__render"
				},
				{
					route: "/ngs-api/UpdateProfile*",
					allowedRoles: ["user"],
					rewrite: "/api/__render"
				},
				{
					route: "/ngs-api/SubmitRun*",
					allowedRoles: ["user"],
					rewrite: "/api/__render"
				},
				{
					route: "/submit",
					allowedRoles: ["user"],
					rewrite: "/api/__render"
				},
				{
					route: "/login",
					rewrite: "/.auth/login/aadb2c"
				},
				{
					route: "/.auth/login/aad",
					statusCode: 404
				},
				{
					route: "/.auth/login/github",
					statusCode: 404
				},
				{
					route: "/.auth/login/twitter",
					statusCode: 404
				},
				{
					route: "/logout",
					redirect: "/.auth/logout"
				}
				]
			}
		  })
	},
  preprocess: vitePreprocess()
};

export default config;
