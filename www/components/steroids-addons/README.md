# Steroids add-ons

Interfaces to third-party services through Steroids

## Configuring steroids.addons.js

Some plugins require that you provide additional configuration details of your app. Steroids.addons.js is configured with an XML file, similar to platform configurations. This file is called `config.steroids.addons.xml` and should be stored in the same directory along with your platform configuration files.

Example path:

    mySteroidsApp/www/config.steroids.addons.xml

Default contents:

    <addons>
    </addons>

The root node for `config.steroids.addons.xml` is `addons`.

## A note on security

Your configuration file will often contain sensitive data, such as public keys to third-party services. Do not place the configuration file to a publicly available location, such as a public Github repository, with its sensitive data intact.

## Addon setup

### Facebook

Setup:

- Install the Phonegap Facebook plugin for your Steroids application.
- Get an App ID for your application from developers.facebook.com. Remember to configure the appropriate identifiers for your application, eg. Bundle ID for iOS.
- Add your Facebook App ID to `config.steroids.addons.xml` under `addons.facebook.appId`.

Example configuration:

    <addons>
      <facebook>
        <appId>
          123456789123456
        </appId>
      </facebook>
    </addons>

Caveats:

- Initializing yields a CORS error, but this should have no effect on later calls to the API.

### Geolocation

Setup:

- To enable continuous position updates, set `addons.geolocation.latestPosition.continuousUpdates` to true.

Example configuration:

    <addons>
      <geolocation>
        <latestPosition>
          <continuousUpdates>
            true
          </continuousUpdates>
        </latestPosition>
      </geolocation>
    </addons>

### OAuth.io

Setup:

- Install the OAuth.io Phonegap plugin for your Steroids application.
- Create a new application on OAuth.io. Make note of the public key for your new app.
- Set up any OAuth providers you'll be using for your OAuth.io application.
- If needed, revise the domain access whitelist with the domains used by your chosen providers in your Steroids application's `config.xml`.
- Configure `addons.oauthio.publicKey` with the public key.

Example configuration:

    <addons>
      <oauthio>
        <publicKey>
          qweASD-zxcRTY_fghVBN-uioJKL
        </publicKey>
      </oauthio>
    </addons>
