db_name="flowers_db"
backupfolder="/var/lib/postgresql/backups"
latest_backup=$(ls -1t "$backupfolder"/*.sql.gz 2>/dev/null | head -n 1)

if [ -z "$latest_backup" ]; then
    echo "No backups found in $backupfolder"
    exit 1
fi

echo "Restoring from backup: $latest_backup"

# Убедитесь, что команда pg_restore доступна
if ! command -v pg_restore &> /dev/null; then
    echo "pg_restore could not be found"
    exit 1
fi

# Распаковать последний бэкап
if gunzip -c "$latest_backup" > "$backupfolder/temp_restore.sql"; then
    echo "Backup extracted to temporary file"
else
    echo "Error extracting backup"
    exit 1
fi

# Восстановить базу данных
if psql -U postgres -d "$db_name" -f "$backupfolder/temp_restore.sql"; then
    echo "Database $db_name restored successfully"
else
    echo "Error restoring database"
    exit 1
fi

# Удалить временный файл
rm "$backupfolder/temp_restore.sql"
echo "Temporary restore file deleted"
