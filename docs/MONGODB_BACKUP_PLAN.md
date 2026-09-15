# MongoDB backup and recovery plan

## Production policy

- Enable MongoDB Atlas Cloud Backups when the production cluster tier supports them.
- Keep daily snapshots for 7 days, weekly snapshots for 4 weeks, and monthly snapshots for 3 months.
- Restrict backup and restore permissions to the owner and one designated backup administrator.
- Never store `MONGO_URI`, Atlas passwords, recovery codes, or exported customer data in Git.

## Manual backup for free/shared clusters

Until Cloud Backups are available, run an encrypted weekly export from an approved administrator machine:

```bash
mongodump --uri="$VELVET_CRUMB_MONGO_URI" --archive="velvet-crumb-$(date +%F).archive" --gzip
```

Move the archive immediately to encrypted, access-controlled storage. Keep four weekly copies and delete local working copies securely after verifying the upload.

## Restore procedure

1. Create a separate test cluster; never test a restore over production.
2. Download and decrypt the selected backup.
3. Restore with `mongorestore --uri="$RESTORE_MONGO_URI" --archive=<file> --gzip --drop`.
4. Verify counts and sample records for `products`, `categories`, `orders`, `settings`, `deliveryareas`, and `admins`.
5. Test storefront loading, order tracking, and admin login against the restored database.
6. Record the backup date, restore duration, verifier, and result.

## Recovery objective and checks

- Target recovery point: no more than 24 hours of order data lost.
- Target recovery time: restore service within 4 hours.
- Run a restore drill every quarter and after any database migration.
- Atlas alerts should notify the owner about backup failures, storage limits, and unusual database access.

Customer reference images and cake media live in Cloudinary, so MongoDB backups preserve their URLs and public IDs but not the media binaries. Enable Cloudinary backups or retain original uploads separately under the same retention policy.
