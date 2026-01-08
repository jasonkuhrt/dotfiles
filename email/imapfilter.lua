-- imapfilter config for iCloud Mail
-- Docs: https://github.com/lefcha/imapfilter/blob/master/samples/config.lua
-- Run: imapfilter

--------------------------------------------------------------------------------
-- OPTIONS
--------------------------------------------------------------------------------

options.timeout = 120
options.subscribe = true
options.create = true

--------------------------------------------------------------------------------
-- ACCOUNT
--------------------------------------------------------------------------------

icloud = IMAP {
    server = 'imap.mail.me.com',
    username = 'jasonkuhrt@me.com',
    -- Uses same password as mbsync from keychain
    password = pipe_from('security find-generic-password -s "mbsync-icloud" -w'),
    ssl = 'tls1.2',
    port = 993,
}

--------------------------------------------------------------------------------
-- HELPER FUNCTIONS
--------------------------------------------------------------------------------

-- Move messages matching criteria to a folder
function move_to(messages, folder)
    if #messages > 0 then
        messages:move_messages(icloud[folder])
        print("Moved " .. #messages .. " messages to " .. folder)
    end
end

-- Mark messages as read
function mark_read(messages)
    if #messages > 0 then
        messages:mark_seen()
        print("Marked " .. #messages .. " messages as read")
    end
end

--------------------------------------------------------------------------------
-- RULES (customize these!)
--------------------------------------------------------------------------------

-- Get all unread messages in INBOX
inbox = icloud.INBOX
unread = inbox:is_unseen()

-- Example: Move newsletters to Newsletters folder
-- newsletters = unread:contain_from('substack.com')
--             + unread:contain_from('newsletter')
--             + unread:contain_from('noreply')
-- move_to(newsletters, 'Newsletters')

-- Example: Flag school-related emails as important
-- school = unread:contain_from('schoolname.qc.ca')
--        + unread:contain_subject('school')
-- school:mark_flagged()

-- Example: Move receipts/orders
-- receipts = unread:contain_from('amazon.ca')
--          + unread:contain_from('receipt')
--          + unread:contain_subject('order confirmation')
-- move_to(receipts, 'Receipts')

-- Example: Delete old promotional emails (be careful!)
-- old_promo = inbox:is_older(30)
--           * inbox:contain_from('promo@')
-- old_promo:delete_messages()

print("imapfilter rules applied!")
