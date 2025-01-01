# Figure out what you actually like

A very simple webapp to help you decide what your favourite text based option is. It's kind of like a 'would you rather x or y' question.

![CleanShot 2025-01-01 at 11 03 36@2x](https://github.com/user-attachments/assets/be99eb52-5470-49bf-b2ee-1c4dd71d42da)

This is all v0.dev's work & some prompting from me. I didn't write any code. It took more iterations than it should've because I didn't build prompts with a clear list of requirements or PRD.

Built during the Nylas marketing team's SF offsite in Dec 2024 - we were working on taglines & needed to compare which ones we liked the most.

# How does it work?

It's pretty straightforward:

1. Each option should have a new line.
2. Enter those options into the textbox.
3. You're then shown two options from your list - click the one you like more.
4. The option you didn't pick is replaced by a random option from the list.
5. Keep doing that until you run out of items to compare.

![CleanShot 2025-01-01 at 11 04 31@2x](https://github.com/user-attachments/assets/394a266c-1dcf-4f82-be5e-dc0db6e4b596)

At the end you're then shown a list of how many votes each item received.

![CleanShot 2025-01-01 at 11 05 13@2x](https://github.com/user-attachments/assets/a8489492-87f3-4b00-9dc2-8796420e7cbd)


# Decisions

- It should be very straightforward. All I wanted to do was enter text on new lines.
- The output should be pretty basic. We just needed to see how many votes each option had.
- It should look readable on a TV in a conference room.

# Limitations (aka opportunities to do more)

- It only supports entering text into that field - maybe you could import a .CSV?
- It only supports text, no images - maybe you could upload images next?
- It only supports comparing the winning option from the prior round - maybe it could do a round robin to compare all of the choices against each other?
- It's stateless - maybe it could generate a sharable link?
- You can only see results at the end - maybe you could see voting results during the voting, like a sneak preview?
- Only one person can drive - maybe you could share a link with the options to a group, have them all vote, and then generate a unified table of results?
- The output is a very basic table with the list of options & how many votes it got - is there an output that's more useful?
