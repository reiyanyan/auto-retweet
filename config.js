export default {
    REI_BANNER:
    `
        ████████╗██╗░░██╗██╗░░██╗░░░░██████╗░██████╗░██████╗░
        ╚══██╔══╝██║░░██║╚██╗██╔╝░░░██╔════╝██╔════╝░██╔══██╗
        ░░░██║░░░███████║░╚███╔╝░░░░╚█████╗░██║░░██╗░██████╦╝
        ░░░██║░░░██╔══██║░██╔██╗░░░░░╚═══██╗██║░░╚██╗██╔══██╗
        ░░░██║░░░██║░░██║██╔╝╚██╗██╗██████╔╝╚██████╔╝██████╦╝
        ░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝╚═════╝░░╚═════╝░╚═════╝░
    `,
    LIST_TWITTER: [
        {
            username: 'username twitter',
            password: 'password',
            email: 'email'
        },
        {
            username: 'username twitter 2',
            password: 'password 2',
            email: 'email 2'
        },
        /*
        * Kalo mau nambah akun twitter, tinggal di copy aja {}
        * example:
        * {
        *   username: 'username twitter 3,
        *   password: 'password 3'
        *   email: 'email 3'
        * },
        * 
        */
    ],
    LIST_URL: [
        'https://twitter.com/LunaRush_LUS/status/1470738874783600645',
        /*
        * Kalo mau nambah link, tinggal di tambah tanda koma trus enter, trus double atau single quotes ("/') trus paste deh
        * ex: 'https://thx'
        */
    ],
    LIST_QOUTE: [
        "such a good project #hastag1 #hastag2 #hastag3",
        "good project #hastag1 #hastag2 #hastag3",
        "#hastag1 #hastag2 #hastag3 good project",

        /** 
         * Ini daftar quotes untuk dirandom nanti,
        */
    ],
    LIST_FRIENDS: [
        '@sample',
        /**
         * daftar teman untuk random tag
         */
    ],
    AMOUNT_RANDOM: 5 // jumlah teman yang akan di tag, kalo cuma mau 3 yaaaa ganti aja ke angka 3
}