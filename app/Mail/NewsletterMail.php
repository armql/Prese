<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewsletterMail extends Mailable
{
    use Queueable, SerializesModels;

    public $newsletterContent;

    public function __construct($newsletterContent)
    {
        $this->newsletterContent = $newsletterContent;
    }

    public function build()
    {
        return $this->view('emails.prese_discount')
            ->subject('Exciting News from Prese - 5% Discount Offer');
    }
}
