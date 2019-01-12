<?php

namespace App;

use Konekt\Enum\Enum;

class ContactType extends Enum
{
    const __default = self::WEBSITE;

    const PHONE = 'phone';
    const INSTAGRAM = 'instagram';
    const TELEGRAM = 'telegram';
    const WEBSITE = 'website';
    const EMAIL = 'email';
    const ADDRESS = 'address';
    const FACEBOOK = 'facebook';
}
