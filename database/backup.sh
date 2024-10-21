db_name="flowers_db"
backupfolder="/var/lib/postgresql/backups"
keep_day=30
sqlfile="$backupfolder/flowers_db-$(date +%d-%m-%Y_%H-%M-%S).sql"
zipfile="$backupfolder/flowers_db-$(date +%d-%m-%Y_%H-%M-%S).sql.gz"
mkdir -p "$backupfolder"
if ! command -v pg_dump &> /dev/null ; then
	echo "pg_dump could not be found"
	exit 1
fi
if pg_dump -U postgres "$db_name" > "$sqlfile" ; then
	echo "Sql dump created: $sqlfile"
else
	echo "pg_dump returned non-zero code"
	exit
fi
if gzip "$sqlfile"; then
	echo "The backup is compressed"
else
	echo "Error compressing backup"
	exit
fi
if find $backupfolder -mtime +$keep_day -delete; then
	echo "Old backups deleted"
else
	echo "Error deleting backups"
fi
