from django.conf import settings
from django.shortcuts import render
from django.core.mail import EmailMessage


def contact(request):
    if request.method == "POST":
        message_name = request.POST.get('message-name', '').strip()
        message_email = request.POST.get('message-email', '').strip()
        message = request.POST.get('message', '').strip()

        if not all([message_name, message_email, message]):
            return render(request, 'cont/contact.html', {
                'error': 'Please fill in all fields.',
            })

        try:
            email = EmailMessage(
                subject=f"Portfolio Contact: {message_name}",
                body=(
                    f"Name: {message_name}\n"
                    f"Email: {message_email}\n\n"
                    f"Message:\n{message}"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[settings.EMAIL_HOST_USER],
                reply_to=[message_email],
            )
            email.send(fail_silently=False)
            return render(request, 'cont/contact.html', {'message_name': message_name})
        except Exception:
            return render(request, 'cont/contact.html', {
                'error': 'Could not send your message right now. Please email me directly.',
            })

    return render(request, 'cont/contact.html')
