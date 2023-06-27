import React from 'react'
import s from './styles.module.css'
import Link from 'next/link'

function Footer() {
    return (
        <div className={s.footer}>
            <Link href="/faq">Вопросы-ответы</Link>
            <Link href="/about">О нас</Link>
        </div>
    )
}

export default Footer
