<?php

namespace Gram\EventBundle\Command;

trait Memory
{
    public function memory()

    {
        return number_format(floatval((int)memory_get_usage(false) / (1024 * 1024)), 2, '.', ' ') . 'MB';
    }
}