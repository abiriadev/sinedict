import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
	'https://citoovmxdeourtuxvqxa.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpdG9vdm14ZGVvdXJ0dXh2cXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2NDMwNTksImV4cCI6MjAxOTIxOTA1OX0.N7ekN5G3Gpy4oGSpIh-4tiSktVL2WDBQ_IH8MtzOtAU',
)
