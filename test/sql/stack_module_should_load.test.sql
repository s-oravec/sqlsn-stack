--init sqlsn
@sqlsnrc.sql

--require stack module from path (relative to sqlsn-core)
@&&sqlsn_require_from_path "../.."

--case
prompt
prompt * case [required module should load]

--assertions
prompt - command stack_create [&&stack_create] should be defined
prompt - command stack_push [&&stack_push] should be defined
prompt - command stack_pop [&&stack_pop] should be defined

exit 0
