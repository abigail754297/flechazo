tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                flechazo: {
                    red: '#E60039',
                    pink: '#FF2A6D',
                    dark: '#0A0A0E',
                    card: '#14141B',
                    cardLight: '#1C1C26',
                    gold: '#DFA845',
                    goldLight: '#FFF0AA',
                    accent: '#FF0055'
                }
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            boxShadow: {
                'gold-glow': '0 0 20px rgba(223, 168, 69, 0.35)',
                'red-glow': '0 0 25px rgba(230, 0, 57, 0.5)',
                'neon-glow': '0 0 15px #FF2A6D, 0 0 30px #E60039',
            }
        }
    }
}