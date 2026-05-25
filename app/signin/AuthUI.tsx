'use client';

import { useSupabase } from '@/app/supabase-provider';
import { getURL } from '@/utils/helpers';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthUI() {
  const { supabase } = useSupabase();
  return (
    <div className="flex flex-col space-y-4">
      <Auth
        // Cast: @supabase/auth-ui-react is deprecated and its SupabaseClient
        // generic shape lags newer supabase-js. Replace this UI with a hand-rolled
        // form to drop the cast.
        supabaseClient={supabase as never}
        providers={['github']}
        redirectTo={`${getURL()}/auth/callback`}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#4A1B3B',
                brandAccent: '#5B235A',
                brandButtonText: '#F1EDEE',
                defaultButtonBackground: '#FFFFFF',
                defaultButtonBackgroundHover: '#F1EDEE',
                defaultButtonBorder: '#D2C2C5',
                defaultButtonText: '#4A1B3B',
                dividerBackground: '#E5DBDD',
                inputBackground: '#FFFFFF',
                inputBorder: '#D2C2C5',
                inputBorderHover: '#C8A9AF',
                inputBorderFocus: '#AA5476',
                inputText: '#4A1B3B',
                inputLabelText: '#4A1B3B',
                inputPlaceholder: '#9B8189',
                messageText: '#6B4A5C',
                messageBackground: '#F1EDEE',
                messageBorder: '#E5DBDD',
                anchorTextColor: '#AA5476',
                anchorTextHoverColor: '#95416A'
              },
              radii: {
                borderRadiusButton: '12px',
                buttonBorderRadius: '12px',
                inputBorderRadius: '12px'
              },
              fonts: {
                bodyFontFamily: 'Sora, system-ui, sans-serif',
                buttonFontFamily: 'Sora, system-ui, sans-serif',
                inputFontFamily: 'Sora, system-ui, sans-serif',
                labelFontFamily: 'Sora, system-ui, sans-serif'
              }
            }
          }
        }}
      />
    </div>
  );
}
