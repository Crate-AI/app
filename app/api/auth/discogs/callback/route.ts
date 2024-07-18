import { NextResponse } from 'next/server';
import { DiscogsSDK, StorageService } from '@crate.ai/discogs-sdk';
import path from 'path';

// Initialize StorageService storage path
StorageService.storagePath = path.join(process.cwd(), 'storage.json');

const discogs = new DiscogsSDK({
    DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || "",
    DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || "",
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const oauthToken = searchParams.get('oauth_token');
    const oauthVerifier = searchParams.get('oauth_verifier');
    const requestTokenSecret = StorageService.getItem('oauthRequestTokenSecret');


    if (!oauthToken || !oauthVerifier || !requestTokenSecret) {
        console.error('Missing OAuth parameters.');
        return NextResponse.json({ error: 'Missing OAuth parameters.' }, { status: 400 });
    }
    
    try {
        const accessTokenResponse = await discogs.auth.getAccessToken({
            oauthToken,
            tokenSecret: requestTokenSecret,
            oauthVerifier
        });

        StorageService.setItem('oauthAccessToken', accessTokenResponse.oauthAccessToken);
        StorageService.setItem('oauthAccessTokenSecret', accessTokenResponse.oauthAccessTokenSecret);
        const oauthTokenSecret =  StorageService.getItem('oauthAccessTokenSecret');
        try {
            const userIdentity = await discogs.auth.getUserIdentity(oauthToken, oauthTokenSecret);
            console.log('userIdentity:', userIdentity);
        } catch (error) {
            console.error('Error getting user identity:', error);
        }
            return new NextResponse(`
                <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Auto Close Window</title>
            </head>
            <body>
                <p>Authentication successful! This window will close in <span id="seconds">5</span> seconds.</p>
                <script>
                    let seconds = 5;
                    const countdownElement = document.getElementById('seconds');

                    const countdown = setInterval(() => {
                        seconds--;
                        countdownElement.textContent = seconds;
                        if (seconds <= 0) {
                            clearInterval(countdown);
                            document.body.innerHTML = '<p>You can close this window now.</p>';
                            if (window.opener) {
                                window.opener.postMessage("oauth_verifier_saved", "*");
                            } else {
                                console.warn("window.opener is null");
                            }
                            window.close();
                        }
                    }, 1000);
                </script>
            </body>
            </html>
        `, {
            headers: { 'Content-Type': 'text/html' }
        })
    } catch (error: any) {
        console.error('Error getting access token:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}