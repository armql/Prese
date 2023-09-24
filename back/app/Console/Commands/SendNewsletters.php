<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Subscriber;
use App\Services\NewsletterService;

class SendNewsletters extends Command
{
    protected $signature = 'send:newsletters';

    protected $description = 'Send newsletters to subscribers';

    public function handle()
    {
        $subscribers = Subscriber::all();

        foreach ($subscribers as $subscriber) {
            NewsletterService::sendNewsletter($subscriber);
        }

        $this->info('Newsletters sent successfully.');
    }
}