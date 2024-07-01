"""userr2

Revision ID: 71efe7b2e2ff
Revises: e81a175b0438
Create Date: 2024-06-23 19:17:10.541539

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '71efe7b2e2ff'
down_revision = 'e81a175b0438'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=100), nullable=False),
    sa.Column('password_hash', sa.String(length=128), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    # ### end Alembic commands ###