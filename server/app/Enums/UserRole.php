<?php

namespace App;

use Konekt\Enum\Enum;

class UserRole extends Enum
{
    const __default = self::USER;

    const USER = 'user';
    const ADMINISTRATOR = 'administrator';
}
