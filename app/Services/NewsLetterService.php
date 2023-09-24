<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;

/**
 * Summary of NewsletterService
 */
class NewsletterService
{
    /**
     * Summary of sendNewsletter
     * @param mixed $subscriber
     * @return void
     */
    public static function sendNewsletter($subscriber)
    {
        $newsletter = self::generateNewsletter($subscriber);

        Mail::to($subscriber->email)->send($newsletter);
    }

    /**
     * Summary of generateNewsletter
     * @param mixed $subscriber
     * @return mixed|string
     */
    private static function generateNewsletter($subscriber)
    {
        // Generate and customize the newsletter content based on the template
        // You can use Blade views or plain HTML/CSS to build the email content

        return view('emails.prese_discount')
            ->subject('Exciting News from Prese - 5% Discount Offer')->render();
    }
}
